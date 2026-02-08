import { useState } from 'react';

export const useLoading = (initialState = false) => {
    const [loading, setLoading] = useState(initialState);
    const [uploading, setUploading] = useState(false);

    return {
        loading,
        setLoading,
        uploading,
        setUploading,
    };
};
