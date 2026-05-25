'use client';

import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Plus, ClipboardList, Search, ChevronDown, X, Trash2, Archive, Upload, FileText, Image, File, Paperclip, Settings2, ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockTasks } from '@/data/mock';
import type { EmployeeTask, TaskFile, TaskStatus, TaskUser } from '@/types/database';

const USERS: TaskUser[] = ['יהושע', 'אלעד', 'יחיאל'];
const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'לביצוע' },
  { value: 'done', label: 'בוצע' },
  { value: 'canceled', label: 'בוטל' },
];

interface TaskForm {
  name: string;
  description: string;
  user: TaskUser;
  status: TaskStatus;
  created_by: string;
}

const emptyForm: TaskForm = { name: '', description: '', user: 'יהושע', status: 'todo', created_by: 'יהושע' };

export default function TasksPage() {
  const [tasks, setTasks] = useState<EmployeeTask[]>(mockTasks);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState<TaskForm>(emptyForm);
  const [formFiles, setFormFiles] = useState<TaskFile[]>([]);
  const [isNew, setIsNew] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [previewFile, setPreviewFile] = useState<TaskFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList) => {
    const newFiles: TaskFile[] = Array.from(fileList).map((f) => ({
      id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: f.name,
      size: f.size,
      type: f.type,
      url: URL.createObjectURL(f),
    }));
    setFormFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const [confirmDeleteFileId, setConfirmDeleteFileId] = useState<string | null>(null);

  function removeFile(fileId: string) {
    if (confirmDeleteFileId === fileId) {
      setFormFiles((prev) => {
        const file = prev.find((f) => f.id === fileId);
        if (file) URL.revokeObjectURL(file.url);
        return prev.filter((f) => f.id !== fileId);
      });
      setConfirmDeleteFileId(null);
    } else {
      setConfirmDeleteFileId(fileId);
    }
  }

  function getFileIcon(type: string) {
    if (type.startsWith('image/')) return <Image className="h-4 w-4 text-blue-500" />;
    if (type.includes('pdf')) return <FileText className="h-4 w-4 text-red-500" />;
    return <File className="h-4 w-4 text-[var(--muted)]" />;
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [groupBy, setGroupBy] = useState<'none' | 'user'>('none');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const [hiddenCols, setHiddenCols] = useState<Set<string>>(new Set());
  const [showColPicker, setShowColPicker] = useState(false);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const colPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (colPickerRef.current && !colPickerRef.current.contains(e.target as Node)) setShowColPicker(false);
    }
    if (showColPicker) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showColPicker]);

  interface TaskColumn {
    key: string;
    header: string;
    sortValue?: (t: EmployeeTask) => string | number;
  }

  const allColumns: TaskColumn[] = [
    { key: 'name', header: 'שם', sortValue: (t) => t.name },
    { key: 'description', header: 'תיאור', sortValue: (t) => t.description },
    { key: 'user', header: 'אחראי', sortValue: (t) => t.user },
    { key: 'status', header: 'סטטוס', sortValue: (t) => t.status },
    { key: 'created_at', header: 'תאריך יצירה', sortValue: (t) => t.created_at },
    { key: 'created_by', header: 'נוצר ע"י', sortValue: (t) => t.created_by },
  ];

  const visibleColumns = allColumns.filter((c) => !hiddenCols.has(c.key));

  function handleSort(col: TaskColumn) {
    if (!col.sortValue) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col.key);
      setSortDir('asc');
    }
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (!showArchived && !t.active) return false;
      if (showArchived && t.active) return false;
      if (filterStatus !== 'all' && t.status !== filterStatus) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.name.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [tasks, filterStatus, search, showArchived]);

  const archivedCount = useMemo(() => tasks.filter((t) => !t.active).length, [tasks]);

  const sortedTasks = useMemo(() => {
    if (!sortKey) return filteredTasks;
    const col = allColumns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return filteredTasks;
    return [...filteredTasks].sort((a, b) => {
      const va = col.sortValue!(a);
      const vb = col.sortValue!(b);
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredTasks, sortKey, sortDir]);

  const grouped = useMemo(() => {
    if (groupBy === 'none') return null;
    const map = new Map<string, EmployeeTask[]>();
    for (const t of sortedTasks) {
      const key = t.user;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return map;
  }, [sortedTasks, groupBy]);

  function archiveTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, active: false } : t)));
    if (expandedId === id) setExpandedId(null);
  }

  function restoreTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, active: true } : t)));
  }

  const [confirmPermanentDeleteId, setConfirmPermanentDeleteId] = useState<string | null>(null);

  function permanentlyDeleteTask(id: string) {
    if (confirmPermanentDeleteId === id) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setConfirmPermanentDeleteId(null);
    } else {
      setConfirmPermanentDeleteId(id);
    }
  }

  function toggleTask(task: EmployeeTask) {
    if (expandedId === task.id && !isNew) {
      setExpandedId(null);
      return;
    }
    setIsNew(false);
    setExpandedId(task.id);
    setForm({ name: task.name, description: task.description, user: task.user, status: task.status, created_by: task.created_by });
    setFormFiles(task.files);
  }

  function openNew() {
    setIsNew(true);
    setExpandedId('__new__');
    setForm(emptyForm);
    setFormFiles([]);
  }

  function close() {
    setExpandedId(null);
    setIsNew(false);
    setConfirmDeleteFileId(null);
  }

  function saveTask() {
    if (!form.name.trim()) return;

    if (isNew) {
      const newTask: EmployeeTask = {
        id: `task-${Date.now()}`,
        name: form.name,
        description: form.description || '',
        user: form.user,
        status: form.status,
        active: true,
        files: formFiles,
        created_at: new Date().toISOString(),
        created_by: form.created_by,
      };
      setTasks((prev) => [newTask, ...prev]);
    } else if (expandedId) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === expandedId
            ? { ...t, name: form.name, description: form.description, user: form.user, status: form.status, created_by: form.created_by, files: formFiles }
            : t
        )
      );
    }

    close();
  }

  function toggleGroup(key: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function renderInlineForm(task?: EmployeeTask) {
    return (
      <tr>
        <td colSpan={visibleColumns.length + 1 + (showArchived ? 1 : 0)} className="p-0">
          <div className="border-t border-[var(--accent)]/20 bg-emerald-50/30 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {isNew ? 'משימה חדשה' : 'עריכת משימה'}
              </h3>
              <button onClick={close} className="rounded-lg p-1 text-[var(--muted)] transition hover:bg-white hover:text-[var(--foreground)]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="mb-1 block text-xs font-medium text-[var(--muted)]">שם המשימה</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="שם המשימה"
                  className="w-full rounded-lg border border-[var(--input-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="mb-1 block text-xs font-medium text-[var(--muted)]">תיאור</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="תיאור המשימה..."
                  rows={3}
                  className="w-full rounded-lg border border-[var(--input-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--muted)]">אחראי</label>
                <select
                  value={form.user}
                  onChange={(e) => setForm({ ...form, user: e.target.value as TaskUser })}
                  className="w-full rounded-lg border border-[var(--input-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  {USERS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--muted)]">סטטוס</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
                  className="w-full rounded-lg border border-[var(--input-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--muted)]">נוצר ע&quot;י</label>
                <select
                  value={form.created_by}
                  onChange={(e) => setForm({ ...form, created_by: e.target.value })}
                  className="w-full rounded-lg border border-[var(--input-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  {USERS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              {task && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--muted)]">תאריך יצירה</label>
                  <p className="rounded-lg border border-[var(--input-border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--muted)]">
                    {new Date(task.created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              )}
            </div>

            {/* File upload */}
            <div className="mt-4">
              <label className="mb-1 block text-xs font-medium text-[var(--muted)]">מסמכים</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-5 transition ${
                  dragging ? 'border-[var(--accent)] bg-emerald-50/50' : 'border-[var(--input-border)] bg-white hover:border-[var(--accent)]/50'
                }`}
              >
                <Upload className="h-5 w-5 text-[var(--muted)]" />
                <p className="text-xs text-[var(--muted)]">גרור קבצים לכאן או לחץ לבחירה</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => { if (e.target.files?.length) { addFiles(e.target.files); e.target.value = ''; } }}
                />
              </div>
              {formFiles.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {formFiles.map((f) => (
                    <div key={f.id} className="flex items-center gap-2 rounded-lg border border-[var(--input-border)] bg-white px-3 py-2">
                      {getFileIcon(f.type)}
                      <button onClick={() => setPreviewFile(f)} className="flex-1 truncate text-start text-xs text-[var(--foreground)] hover:text-[var(--accent)]">
                        {f.name}
                      </button>
                      <span className="text-[10px] text-[var(--muted)]">{formatSize(f.size)}</span>
                      {confirmDeleteFileId === f.id ? (
                        <span className="flex items-center gap-1">
                          <button onClick={() => removeFile(f.id)} className="rounded px-1.5 py-0.5 text-[10px] font-medium text-red-600 transition hover:bg-red-50">
                            מחק
                          </button>
                          <button onClick={() => setConfirmDeleteFileId(null)} className="rounded px-1.5 py-0.5 text-[10px] text-[var(--muted)] transition hover:bg-[var(--input-bg)]">
                            בטל
                          </button>
                        </span>
                      ) : (
                        <button onClick={() => removeFile(f.id)} className="rounded p-0.5 text-[var(--muted)] transition hover:text-red-600">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <button onClick={saveTask} className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90">
                {isNew ? 'צור משימה' : 'שמור'}
              </button>
              <button onClick={close} className="rounded-lg border border-[var(--input-border)] px-5 py-2 text-sm text-[var(--muted)] transition hover:bg-white">
                ביטול
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  function renderCell(key: string, t: EmployeeTask) {
    switch (key) {
      case 'name':
        return (
          <td key={key} className="px-5 py-3.5 text-sm font-medium text-[var(--foreground)]">
            <span className="flex items-center gap-1.5">
              {t.name}
              {t.files.length > 0 && (
                <span className="flex items-center gap-0.5 text-[var(--muted)]">
                  <Paperclip className="h-3 w-3" />
                  <span className="text-[10px]">{t.files.length}</span>
                </span>
              )}
            </span>
          </td>
        );
      case 'description':
        return (
          <td key={key} className="px-5 py-3.5 text-sm text-[var(--muted)]">
            <span className="block truncate">{t.description}</span>
          </td>
        );
      case 'user':
        return <td key={key} className="px-5 py-3.5 text-sm font-medium">{t.user}</td>;
      case 'status':
        return <td key={key} className="px-5 py-3.5 text-sm"><StatusBadge status={t.status} /></td>;
      case 'created_at':
        return <td key={key} className="px-5 py-3.5 text-sm text-[var(--muted)]">{new Date(t.created_at).toLocaleDateString('he-IL')}</td>;
      case 'created_by':
        return <td key={key} className="px-5 py-3.5 text-sm text-[var(--muted)]">{t.created_by}</td>;
      default:
        return null;
    }
  }

  function renderRow(t: EmployeeTask) {
    const isExpanded = expandedId === t.id && !isNew;
    return [
      <tr
        key={t.id}
        onClick={() => !showArchived && toggleTask(t)}
        className={`transition-colors ${!showArchived ? 'cursor-pointer' : ''} ${isExpanded ? 'bg-emerald-50/60' : 'hover:bg-[var(--input-bg)]'}`}
      >
        {showArchived && (
          <td className="px-3 py-3.5 text-sm">
            {confirmPermanentDeleteId === t.id ? (
              <span className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); permanentlyDeleteTask(t.id); }}
                  className="rounded px-1.5 py-0.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                >
                  מחק
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setConfirmPermanentDeleteId(null); }}
                  className="rounded px-1.5 py-0.5 text-xs text-[var(--muted)] transition hover:bg-[var(--input-bg)]"
                >
                  בטל
                </button>
              </span>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); permanentlyDeleteTask(t.id); }}
                title="מחק לצמיתות"
                className="rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </td>
        )}
        {visibleColumns.map((col) => renderCell(col.key, t))}
        <td className="px-3 py-3.5 text-sm">
          {showArchived ? (
            <button
              onClick={(e) => { e.stopPropagation(); restoreTask(t.id); }}
              title="שחזר"
              className="rounded-lg p-1.5 text-[var(--accent)] transition hover:bg-emerald-50"
            >
              <Archive className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); archiveTask(t.id); }}
              title="העבר לארכיון"
              className="rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </td>
      </tr>,
      isExpanded ? <React.Fragment key={`${t.id}-form`}>{renderInlineForm(t)}</React.Fragment> : null,
    ];
  }

  function renderTableHead() {
    return (
      <tr className="border-b border-[var(--card-border)]">
        {showArchived && <th className="w-10 px-3 py-3.5" />}
        {visibleColumns.map((col) => (
          <th
            key={col.key}
            onClick={() => handleSort(col)}
            className="cursor-pointer select-none px-5 py-3.5 text-start text-xs font-medium uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <span className="flex items-center gap-1">
              {col.header}
              {sortKey === col.key
                ? sortDir === 'asc'
                  ? <ArrowUp className="h-3 w-3" />
                  : <ArrowDown className="h-3 w-3" />
                : <ChevronsUpDown className="h-3 w-3 opacity-40" />
              }
            </span>
          </th>
        ))}
        <th className="w-10 px-3 py-3.5">
          <div ref={colPickerRef} className="relative">
            <button
              onClick={() => setShowColPicker(!showColPicker)}
              className={`rounded-lg p-1 transition ${showColPicker ? 'bg-emerald-50 text-[var(--accent-text)]' : 'text-[var(--muted)] hover:bg-[var(--input-bg)] hover:text-[var(--foreground)]'}`}
              title="הצג/הסתר עמודות"
            >
              <Settings2 className="h-4 w-4" />
            </button>
            {showColPicker && (
              <div className="absolute left-0 top-full z-20 mt-1 min-w-[160px] rounded-xl border border-[var(--card-border)] bg-[var(--card)] py-2 shadow-lg">
                {allColumns.map((col) => (
                  <label key={col.key} className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm hover:bg-[var(--input-bg)]">
                    <input
                      type="checkbox"
                      checked={!hiddenCols.has(col.key)}
                      onChange={() => {
                        setHiddenCols((prev) => {
                          const next = new Set(prev);
                          if (next.has(col.key)) next.delete(col.key);
                          else next.add(col.key);
                          return next;
                        });
                      }}
                      className="h-3.5 w-3.5 rounded border-[var(--input-border)] accent-[var(--accent)]"
                    />
                    <span className="text-[var(--foreground)]">{col.header}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </th>
      </tr>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-[var(--accent)]" />
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">משימות</h1>
            <p className="mt-0.5 text-sm text-[var(--muted)]">ניהול משימות צוות</p>
          </div>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          משימה חדשה
        </button>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש לפי שם או תיאור..."
            className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] py-2.5 pr-10 pl-4 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="all">כל הסטטוסים</option>
          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select
          value={groupBy}
          onChange={(e) => { setGroupBy(e.target.value as 'none' | 'user'); setCollapsedGroups(new Set()); }}
          className="rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="none">ללא קיבוץ</option>
          <option value="user">קיבוץ לפי אחראי</option>
        </select>
        <button
          onClick={() => { setShowArchived(!showArchived); setExpandedId(null); setIsNew(false); }}
          className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm transition ${
            showArchived
              ? 'border-[var(--accent)] bg-emerald-50 text-[var(--accent-text)]'
              : 'border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          <Archive className="h-3.5 w-3.5" />
          ארכיון{archivedCount > 0 && ` (${archivedCount})`}
        </button>
      </div>

      <p className="mb-4 text-xs text-[var(--muted)]">{sortedTasks.length} משימות{showArchived ? ' בארכיון' : ''}</p>

      {/* New task inline form at top */}
      {isNew && expandedId === '__new__' && (
        <div className="mb-4 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full"><tbody>{renderInlineForm()}</tbody></table>
        </div>
      )}

      {sortedTasks.length === 0 ? (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-12 text-center">
          <p className="text-[var(--muted)]">{showArchived ? 'אין משימות בארכיון' : 'אין משימות להצגה'}</p>
        </div>
      ) : grouped ? (
        <div className="space-y-4">
          {Array.from(grouped.entries()).map(([userName, userTasks]) => {
            const isCollapsed = collapsedGroups.has(userName);
            return (
              <div key={userName} className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
                <button
                  onClick={() => toggleGroup(userName)}
                  className="flex w-full items-center gap-2 border-b border-[var(--card-border)] bg-[var(--background)] px-5 py-3 text-start"
                >
                  <ChevronDown className={`h-4 w-4 text-[var(--muted)] transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
                  <span className="text-sm font-semibold text-[var(--foreground)]">{userName}</span>
                  <span className="mr-auto rounded-full bg-[var(--input-bg)] px-2.5 py-0.5 text-xs text-[var(--muted)]">{userTasks.length}</span>
                </button>
                {!isCollapsed && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>{renderTableHead()}</thead>
                      <tbody className="divide-y divide-[var(--card-border)]">
                        {userTasks.map(renderRow)}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full">
            <thead>{renderTableHead()}</thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {sortedTasks.map(renderRow)}
            </tbody>
          </table>
        </div>
      )}

      {/* File preview modal */}
      {previewFile && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setPreviewFile(null)} />
          <div className="fixed inset-4 z-50 mx-auto flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-2xl sm:inset-y-12 sm:inset-x-auto">
            <div className="flex items-center justify-between border-b border-[var(--card-border)] px-5 py-3">
              <span className="truncate text-sm font-medium text-[var(--foreground)]">{previewFile.name}</span>
              <button onClick={() => setPreviewFile(null)} className="rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-[var(--input-bg)] hover:text-[var(--foreground)]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-auto p-6">
              {previewFile.type.startsWith('image/') ? (
                <img src={previewFile.url} alt={previewFile.name} className="max-h-full max-w-full rounded-lg object-contain" />
              ) : previewFile.type === 'application/pdf' ? (
                <iframe src={previewFile.url} className="h-full w-full rounded-lg" title={previewFile.name} />
              ) : (
                <div className="text-center">
                  <File className="mx-auto mb-3 h-12 w-12 text-[var(--muted)]" />
                  <p className="text-sm text-[var(--muted)]">אין תצוגה מקדימה לקובץ זה</p>
                  <a href={previewFile.url} download={previewFile.name} className="mt-3 inline-block rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
                    הורד קובץ
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
