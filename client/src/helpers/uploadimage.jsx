const url = "https://api.cloudinary.com/v1_1/dgvj6xweu/image/upload"

const UploadImage =async (image) => {

    const formData=new FormData()
    formData.append("file",image)
    formData.append("upload_preset","ecomm_product")

    const dataResponse = await fetch(url,{
        method:'POST',
        body:formData
    })

    return dataResponse.json()

}

export default UploadImage