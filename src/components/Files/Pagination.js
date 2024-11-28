import React from 'react';

const Pagination = ({ pagination, onPageChange, isMyFiles = false }) => {
    if (!pagination) return null;

    if (isMyFiles) {
        return (
          <div className="pagination">
            <button
              onClick={() => onPageChange(pagination.current_page - 1)}
              disabled={!pagination.prev_page_url}
            >
              Previous
            </button>
            <span>
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <button
              onClick={() => onPageChange(pagination.current_page + 1)}
              disabled={!pagination.next_page_url} 
            >
              Next
            </button>
          </div>
        );
    }

    return (
      <div className="pagination">
        <button
          onClick={() => onPageChange(pagination.current_page - 1)}
          disabled={!pagination.prev_page_url} 
        >
          Previous
        </button>
        <span>
          Page {pagination.current_page} of {pagination.last_page}
        </span>
        <button
          onClick={() => onPageChange(pagination.current_page + 1)}
          disabled={!pagination.next_page_url} 
        >
          Next
        </button>
      </div>
    );
};

export default Pagination;
