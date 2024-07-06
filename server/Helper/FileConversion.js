const FileConversion =async(files)=>{
return await Promise.all(files.map((file)=>{
  const base64data = file.data.toString('base64');
  return{
    ...file.toObject(),
    data:base64data
  }
}))
}

module.exports = FileConversion;