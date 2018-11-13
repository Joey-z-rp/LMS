import * as React from 'react'
import { Label, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const PersonLabel = ({name, image, src, size, rating = undefined}) => (
    <React.Fragment>
        <Label as={Link} to={src} image size={size}>
            <img src={image} />
            {name}
        </Label>
        {
            rating
                ? <Rating icon='star' disabled rating={rating} maxRating={5} />
                : null
        }
    </React.Fragment>
);

export default PersonLabel;