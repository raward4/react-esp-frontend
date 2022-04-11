import styles from './PuppyList.module.css'
import PuppyCard from '../../components/PuppyCard/PuppyCard';

const dogIds = [1025,1012,1062,1084,169,200,219,237,244,275,40,433,577,582,593,611,659,718,783,790,824,837,881,937,943]

const PuppyList = (props) => {
  return (
    <>
      <h1>Puppy List</h1>
      <div className={styles.container}>
        {props.puppies.map(puppy => (
          <PuppyCard
            key={puppy._id} 
            puppy={puppy} 
            randDogImgId={dogIds[Math.floor(Math.random()*(dogIds.length))]}
            handleDeletePuppy={props.handleDeletePuppy}
            user={props.user}
          />
        ))}
      </div>
    </>
  );
}
 
export default PuppyList;