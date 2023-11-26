import './ProductCard.css'

export const ProductCard = ({ article, description, intervention_type }) => {

    return (
        <div className="productCardDesign">
            <div><img className='avatar' src={article ? article : `https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg`} /></div>
            <div className='text'>{description}</div>
            <div className='text'>{intervention_type}</div>
        </div>
    )
}