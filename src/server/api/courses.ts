export const getCourses = (req, res) => {
    setTimeout(() => {
        res.json([
            {
                name: 'Web Full Stack',
                id: '123',
                from: '2018-11-06',
                to: '2018-11-22',
                description: 'blah blahblah blahblah blah blah blah',
                students: 3,
                img: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'Web Full Stack2',
                id: '123',
                from: '2018-11-09',
                to: '2018-11-22',
                description: 'blah blahblah blahblah blah blah blah',
                students: 22,
                img: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'Web Full Stack3',
                id: '123',
                from: '2018-11-01',
                to: '2018-11-22',
                description: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
                students: 10,
                img: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'Web Full Stack4',
                id: '123',
                from: '2018-11-10',
                to: '2018-11-22',
                description: 'blah blahblah blahblah blah blah blah',
                students: 7,
                img: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'Web Full Stack5',
                id: '123',
                from: '2018-11-01',
                to: '2018-11-22',
                description: 'blah blahblah blahblah blah blah blah',
                students: 12,
                img: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
        ]);
    }, 2000)
};

export const getCourse = (req, res) => {
    setTimeout(()=>{
        res.json({
            name: 'Web Full Stack5',
            id: '123',
            from: '2018-11-07',
            to: '2018-11-20',
            description: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
            students: [
                {
                    id: '232',
                    name: 'Super Man',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                },
                {
                    id: '232',
                    name: 'Super Man',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                },
                {
                    id: '232',
                    name: 'Super Man',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                },
            ],
            lecturer: {
                name: 'Super Man',
                image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                rating: 5,
            },
            image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            capacity: 20,
        });
    }, 2000);
};

export const createCourse = (req, res) => {
    console.log(req.body);
    setTimeout(() => {
        res.json(req.body);
    }, 1000)
};

export const saveCourse = (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    setTimeout(() => {
        res.json(req.body);
    }, 1000)
};