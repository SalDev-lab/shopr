import React, { useState } from 'react'
import './Add.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Cakes"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category
            })
            setImage(false);
        } else {
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='add-form' onSubmit={onSubmitHandler}>
                
                <div className='add-img-upload'>
                    <p>Upload Image</p>
                    <input
                        onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }}
                        type="file"
                        accept="image/*"
                        id="image"
                        hidden
                    />
                    <label htmlFor="image" className='upload-label'>
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="Upload Preview" />
                    </label>
                </div>

                <div className='add-field'>
                    <label>Product Name</label>
                    <input
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        placeholder='Type here'
                        required
                    />
                </div>

                <div className='add-field'>
                    <label>Product Description</label>
                    <textarea
                        name='description'
                        onChange={onChangeHandler}
                        value={data.description}
                        rows={6}
                        placeholder='Write content here'
                        required
                    />
                </div>

                <div className='add-flex'>
                    <div className='add-field'>
                        <label>Product Category</label>
                        <select name='category' onChange={onChangeHandler} value={data.category}>
                            <option value="Salad">Cakes</option>
                            <option value="Salad">Foil Cakes</option>
                            <option value="Rolls">Doughnuts</option>
                            <option value="Deserts">Chin Chin</option>
                            <option value="Sandwich">Peanut</option>
                            <option value="Cake">Pastries</option>
                            <option value="Pure Veg">Small Chops</option>
                            <option value="Pasta">Parfait</option>
                        </select>
                    </div>
                    <div className='add-field'>
                        <label>Product Price</label>
                        <input
                            type="number"
                            name='price'
                            onChange={onChangeHandler}
                            value={data.price}
                            placeholder='25'
                            required
                        />
                    </div>
                </div>

                <button type='submit' className='add-btn'>Add Product</button>
            </form>
        </div>
    )
}

export default Add
