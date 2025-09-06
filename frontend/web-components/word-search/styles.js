export const WordSearchStyles = `
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  }

  .word-search-app {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;
    padding: 1.5rem;
    min-height: 600px;
  }

  @media (max-width: 768px) {
    .word-search-app {
      grid-template-columns: 1fr;
    }
  }

  .controls-panel {
    background: #f9fafb;
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  .controls-panel h2 {
    margin: 0 0 1.5rem 0;
    color: #1f2937;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .settings-group {
    margin-bottom: 1.5rem;
  }

  .settings-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #374151;
    font-weight: 500;
    font-size: 0.875rem;
  }

  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: white;
    font-size: 0.875rem;
    color: #374151;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .checkbox-group label {
    display: flex;
    align-items: center;
    font-weight: normal;
    cursor: pointer;
  }

  .checkbox-group input[type="checkbox"] {
    width: auto;
    margin-right: 0.5rem;
  }

  .image-selector {
    margin-top: 2rem;
  }

  .image-selector h3 {
    margin: 0 0 1rem 0;
    color: #374151;
    font-size: 1rem;
    font-weight: 600;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    max-height: 300px;
    overflow-y: auto;
    padding: 0.25rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
  }

  .image-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    border: 2px solid transparent;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .image-item:hover {
    background: #f3f4f6;
  }

  .image-item.selected {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  .image-item img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin-bottom: 0.25rem;
  }

  .image-item span {
    font-size: 0.75rem;
    text-align: center;
    color: #4b5563;
  }

  .btn-primary {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background: #1e40af;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-primary:hover {
    background: #1e3a8a;
  }

  .btn-primary:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  .btn-secondary {
    padding: 0.5rem 1rem;
    background: #fb923c;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-secondary:hover {
    background: #ea580c;
  }

  .preview-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
  }

  #puzzlePreview {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .puzzle-grid {
    display: inline-grid;
    gap: 2px;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.25rem;
  }

  .puzzle-cell {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid #e5e7eb;
    font-family: 'Courier New', monospace;
    font-weight: 600;
    font-size: 1rem;
    color: #1f2937;
  }

  #wordList {
    width: 100%;
    max-width: 400px;
  }

  .word-list-container {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }

  .word-list-title {
    margin: 0 0 1rem 0;
    color: #374151;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
  }

  .word-list-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.5rem;
  }

  .word-item {
    padding: 0.375rem 0.75rem;
    background: #f3f4f6;
    border-radius: 0.25rem;
    text-align: center;
    font-size: 0.875rem;
    color: #4b5563;
    font-weight: 500;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 3rem;
    color: rgba(0, 0, 0, 0.1);
    font-weight: bold;
    pointer-events: none;
    z-index: 10;
  }

  .premium-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: #fbbf24;
    color: #78350f;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: 0.5rem;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error-message {
    padding: 1rem;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 0.375rem;
    color: #991b1b;
    font-size: 0.875rem;
  }

  .success-message {
    padding: 1rem;
    background: #dcfce7;
    border: 1px solid #bbf7d0;
    border-radius: 0.375rem;
    color: #14532d;
    font-size: 0.875rem;
  }
`;