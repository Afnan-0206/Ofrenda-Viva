import React, { useRef } from 'react';
import { X, Download, Upload, FileText, RotateCcw, Check, Sparkles } from 'lucide-react';

/**
 * ExportArchiveModal — Exports the complete ofrenda as an offline JSON archive
 * or printable memorial document that can be kept on a local drive forever.
 */
export default function ExportArchiveModal({
  isOpen,
  onClose,
  ancestors,
  offerings,
  onImportData,
  onResetData
}) {
  if (!isOpen) return null;
  const fileInputRef = useRef(null);

  // Export altar data as JSON archive
  const handleExportJson = () => {
    const archive = {
      title: 'Ofrenda Viva Memorial Archive',
      createdDate: new Date().toISOString(),
      theme: 'Hacktoberfest 2026: Ghost in the Machine',
      engine: 'Gemma 2 Open-Weight Architecture',
      ancestors,
      offerings
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(archive, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ofrenda_viva_archive_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON archive
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.ancestors && Array.isArray(parsed.ancestors)) {
          onImportData(parsed.ancestors, parsed.offerings || offerings);
          alert('Ofrenda archive restored successfully!');
          onClose();
        } else {
          alert('Invalid archive format: ancestors list not found.');
        }
      } catch (err) {
        alert('Failed to parse JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  // Printable Memorial Booklet
  const handlePrintView = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card export-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close export dialog"
        >
          <X size={20} />
        </button>

        <div className="export-header">
          <span className="export-header-icon">📜</span>
          <h2>Archive & Permanent Preservation</h2>
          <p className="export-subtitle">
            Keep your family's ofrenda safe forever on your personal storage. No cloud accounts, zero subscription locks.
          </p>
        </div>

        <div className="export-options-grid">
          {/* Option 1: Download JSON Backup */}
          <div className="export-card">
            <div className="export-card-icon">
              <Download size={24} />
            </div>
            <h4>Download JSON Archive</h4>
            <p>Export all portraits, stories, and generated Calaveritas into an open, portable data file.</p>
            <button
              type="button"
              className="btn-primary-altar full-width"
              onClick={handleExportJson}
            >
              Export JSON Archive
            </button>
          </div>

          {/* Option 2: Import Backup */}
          <div className="export-card">
            <div className="export-card-icon">
              <Upload size={24} />
            </div>
            <h4>Restore Family Archive</h4>
            <p>Load an existing ofrenda backup file from your computer or USB drive.</p>
            <button
              type="button"
              className="btn-secondary full-width"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Backup File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {/* Option 3: Print Memorial Card */}
          <div className="export-card">
            <div className="export-card-icon">
              <FileText size={24} />
            </div>
            <h4>Print Memorial Altar Card</h4>
            <p>Format the altar into a clean print-ready layout to frame beside your physical home ofrenda.</p>
            <button
              type="button"
              className="btn-secondary full-width"
              onClick={handlePrintView}
            >
              Open Print Layout
            </button>
          </div>
        </div>

        {/* Reset button footer */}
        <div className="export-footer-strip">
          <button
            type="button"
            className="btn-reset-altar"
            onClick={() => {
              if (confirm('Reset altar to default demonstration data?')) {
                onResetData();
                onClose();
              }
            }}
          >
            <RotateCcw size={14} />
            <span>Restore Default Sample Altar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
