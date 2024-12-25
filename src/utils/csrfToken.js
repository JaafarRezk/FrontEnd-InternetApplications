const getCsrfToken = () => {
    const tokenMeta = document.querySelector('meta[name="csrf-token"]');
    return tokenMeta ? tokenMeta.getAttribute('content') : null;
  };
  
  export default getCsrfToken;
  