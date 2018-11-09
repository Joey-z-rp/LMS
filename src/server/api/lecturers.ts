export const getLecturers = (req, res) => {
    setTimeout(()=>{
        res.json([
            {
                name: 'Sarah Smith',
                image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'David Semmy',
                image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'John Smith',
                image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'Super Man',
                image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
            },
        ]);
    }, 1000);
};
