import { Link } from 'react-router-dom'

function PuppyCard({puppy, randDogImgId, handleDeletePuppy, user}) {
  return(
    <div className="card">
      <img 
        src={puppy.photo ? puppy.photo : `https://picsum.photos/id/${randDogImgId}/640/480`} 
        alt="A happy puppy"
        className="card-img-top" 
      />
      <div className="card-body">
        <h2 className="card-text">{puppy.name}</h2>
        <p className="card-text">A {puppy.rating}-year-old {puppy.joke}</p>
      </div>
      {
        user.profile === puppy.owner?._id ?
          <div className="card-footer">
            <Link
              className='btn btn-sm btn-warning'
              to='/edit'
              state={{puppy}}
            >
              Edit
            </Link>
            <button
              className="btn btn-sm btn-danger m-left"
              onClick={()=> handleDeletePuppy(puppy._id)}
            >
              Delete
            </button>
          </div>
        :
        <div className="card-body">
          <p className="card-text">- {puppy.owner?.name ? puppy.owner?.name : 'Some person'}'s pup</p>
        </div>
      }
    </div>
  )
}

export default PuppyCard