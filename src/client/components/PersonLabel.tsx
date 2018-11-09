import * as React from 'react'
import { Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const PersonLabel = ({name, image, src, size}) => (
    <Label as={Link} to={src} image size={size}>
        <img src={image} />
        {name}
    </Label>
);

export default PersonLabel