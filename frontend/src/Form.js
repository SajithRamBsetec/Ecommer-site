import React from 'react'

const Form = () => {
    return (
        <div>
            <form className='productform'>
                <label>Category</label>
                <input type="text" placeholder="Specify Category" onChange={(e) => { setCategory(e.target.value) }} />
                <label>Tags</label>
                <input type="text" placeholder="Enter tags" onChange={(e) => { setTags(e.target.value) }} />
                <label>Upload File</label>
                <input type="file" accept="images/*,video/*" onChange={(e) => { setFile(e.target.files[0]) }} />
            </form>
        </div>
    )
}

export default Form