import React from 'react';

const ActionButtons = ({ postStatus, onSave }) => {
  const isDraft = postStatus === 'Draft';
  const isPublished = postStatus === 'Published';

  return (
    <div className="action-buttons">
      {/* If blog status = Draft, show PUBLISH|SAVE */}
      {isDraft && (
        <>
          <button 
            className="btn-publish" 
            onClick={() => onSave('Published')}
          >
            PUBLISH
          </button>
          <button 
            className="btn-save-draft" 
            onClick={() => onSave('Draft')}
          >
            SAVE DRAFT
          </button>
        </>
      )}

      {/* If blog status = Published, show only SAVE */}
      {isPublished && (
        <button 
          className="btn-save-published" 
          onClick={() => onSave('Published')}
        >
          SAVE CHANGES
        </button>
      )}
    </div>
  );
};

export default ActionButtons;