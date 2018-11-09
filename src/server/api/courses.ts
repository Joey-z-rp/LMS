export const getCourses = (req, res) => {
    setTimeout(() => {
        res.json([
            {
                name: 'Web Full Stack',
                id: '123',
                from: '01-11-2018',
                to: '02-12-2018',
                description: 'blah blahblah blahblah blah blah blah',
                students: 22,
                img: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'Web Full Stack2',
                id: '123',
                from: '01-11-2018',
                to: '02-12-2018',
                description: 'blah blahblah blahblah blah blah blah',
                students: 22,
                img: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'Web Full Stack3',
                id: '123',
                from: '01-11-2018',
                to: '02-12-2018',
                description: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
                students: 22,
                img: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'Web Full Stack4',
                id: '123',
                from: '01-11-2018',
                to: '02-12-2018',
                description: 'blah blahblah blahblah blah blah blah',
                students: 22,
                img: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            },
            {
                name: 'Web Full Stack5',
                id: '123',
                from: '01-11-2018',
                to: '02-12-2018',
                description: 'blah blahblah blahblah blah blah blah',
                students: 22,
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
            from: '2018-11-01',
            to: '2018-11-20',
            description: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
            students: [
                {
                    name: 'Super Man',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                },
                {
                    name: 'Super Man',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                },
                {
                    name: 'Super Man',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                },
            ],
            lecturer: {
                name: 'Super Man',
                image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
            },
            image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
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