import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom'

function EditPuppy(props) {
  const location = useLocation()
  const [formData, setFormData] = useState(location.state.puppy)
  const [validForm, setValidForm] = useState(true)
  const formElement = useRef()

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

	const handleSubmit = evt => {
		evt.preventDefault()
		const puppyFormData = new FormData()
		puppyFormData.append('photo', formData.photo)
		puppyFormData.append('name', formData.name)
		puppyFormData.append('rating', formData.rating)
		puppyFormData.append('joke', formData.joke)
		puppyFormData.append('_id', formData._id) 
		props.handleUpdatePuppy(puppyFormData)
	}

	const handleChangePhoto = (evt) => {
		setFormData({...formData, photo: evt.target.files[0]})
	}

	return (
		<>
			<h1>Edit Puppy</h1>
			<form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="name-input" className="form-label">
						Puppy's Name (required)
					</label>
					<input 
						type="text"
						className="form-control"
						id="name-input"
						name="name"
            value={formData.name}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="joke-input" className="form-label">
						Puppy's Joke (required)
					</label>
					<input 
						type="text"
						className="form-control"
						id="joke-input"
						name="joke"
            value={formData.joke}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group mb-4">
					<label htmlFor="age-input" className="form-label">
						Puppy's Rating
					</label>
					<input 
						type="number"
						className="form-control"
						id="rating-input"
						name="rating"
            value={formData.rating}
            onChange={handleChange}
					/>
				</div>
				<div className="form-group mb-4">
					<label htmlFor="photo-upload" className="form-label">
						Upload Photo
					</label>
					<input
						type="file"
						className="form-control"
						id="photo-upload"
						name="photo"
						onChange={handleChangePhoto}
					/>
				</div>
				<div className="d-grid mb-3">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Save Puppy
					</button>
				</div>
        <div className="d-grid">
					<Link
						to="/"
						className="btn btn-danger btn-fluid"
					>
						Cancel
					</Link>
				</div>
			</form>
		</>
	)
}

export default EditPuppy