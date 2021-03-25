export function emailValid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  export function getDataFromDoc(doc){
    const data = doc.data()
    data.id = doc.id
    return data
  }
  
  export async function uploadFile (file){
    // tao duong dan den file
    const fileName = file.name
    const filePath = `files/${fileName}`
    // tro den duong dan do
    const fileRef = firebase.storage().ref().child(filePath)
    // day file len duong dan day
    await fileRef.put(file)
    // sau khi xong thi lay url
    return getFileUrl(fileRef)
  }
  function getFileUrl(fileRef) {
    return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}?alt=media`
  }
  
  export function getDataFromDocs(docs){
    return docs.map(getDataFromDoc)
  }