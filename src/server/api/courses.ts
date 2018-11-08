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
                description: 'blah blahblah blahblah blah blah blah',
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
