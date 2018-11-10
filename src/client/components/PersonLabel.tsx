import * as React from 'react'
import { Label, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const PersonLabel = ({name, image, src, size, rating = undefined}) => (
    <Label as={Link} to={src} image size={size}>
        <img src={image} />
        {name}
        {
            rating
                ? <Rating icon='star' disabled rating={rating} maxRating={5} />
                : null
        }
    </Label>
);

export default PersonLabel;