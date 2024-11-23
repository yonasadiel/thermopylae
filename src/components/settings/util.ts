export const convertBlobToBase64 = (fileBlob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileData = new FileReader();
        fileData.onload = (e) => {
            const result = e.target?.result as ArrayBuffer;
            const b64Image = btoa(new Uint8Array(result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            resolve(b64Image);
        };
        fileData.onerror = reject;
        fileData.readAsArrayBuffer(fileBlob);
    });
};
