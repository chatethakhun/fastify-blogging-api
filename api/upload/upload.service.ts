import axios from "axios"

export const uploadFile = async (file) => {
    console.log(file);
    try {
        const response = await axios.post('https://file.io/', {
            file
        },
            { headers: { "Content-Type": "multipart/form-data", 'Authorization': 'Bearer ' + process.env.FILE_IO_KEY } })
        console.log(file);
        // const response = await axios({
        //     url: 'https://file.io/',
        //     method: 'post',
        //     data: file,
        //     headers: { "Content-Type": "multipart/form-data" },
        // })

        console.log(response);
        return { file: '' }
    } catch (error) {
        console.log('error' + error)
    }
}