import './ProductCard.css'

export const ProductCard = ({ article, description, product_id }) => {

    return (
        <div className="productCardsDesign">
            <div><img className='avatares' src={article ? article : `https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg`} /></div>
            <div className='text'>{description}</div>
            <div className='text'>{product_id}</div>
        </div>
    )
}