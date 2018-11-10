export const getStudents = (req, res) => {
    setTimeout(()=>{
        res.json([
            {
                id: '123',
                name: 'Sarah Smith',
                image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
                email: 'users@gmail.com',
                registered: '2018-10-03',
                enrolledCourse: [
                    '32342',
                    '32344',
                    '5634',
                    '56565',
                ],
            },
            {
                id: '123',
                name: 'David Semmy',
                image: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg',
                email: 'users@gmail.com',
                registered: '2018-10-03',
                enrolledCourse: [
                    '32342',
                    '32344',
                    '5634',
                    '56565',
                ],
            },
            {
                id: '123',
                name: 'John Smith',
                image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
                email: 'users@gmail.com',
                registered: '2018-10-03',
                enrolledCourse: [
                    '32342',
                    '32344',
                    '5634',
                    '56565',
                ],
            },
            {
                id: '123',
                name: 'Super Man',
                image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                email: 'users@gmail.com',
                registered: '2018-10-03',
                enrolledCourse: [
                    '32342',
                    '32344',
                    '5634',
                    '56565',
                ],
            },
        ]);
    }, 1000);
};

export const searchStudents = (req, res) => {
    console.log(req.params.search);

    if (req.params.search === 'none') {
        res.json([]);
    } else {
        setTimeout(()=>{
            res.json([
                {
                    id: '123',
                    name: 'Sarah Smith',
                    image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
                    email: 'users@gmail.com',
                    registered: '2018-10-03',
                    enrolledCourse: [
                        '32342',
                        '32344',
                        '5634',
                        '56565',
                    ],
                },
                {
                    id: '123',
                    name: 'David Semmy',
                    image: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg',
                    email: 'users@gmail.com',
                    registered: '2018-10-03',
                    enrolledCourse: [
                        '32342',
                        '32344',
                        '5634',
                        '56565',
                    ],
                },
            ]);
        }, 1000);
    }
};

export const getStudent = (req, res) => {
    setTimeout(()=>{
        res.json({
            id: '123',
            name: 'Sarah Smith',
            image: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg',
            email: 'users@gmail.com',
            phone: '0433343134',
            registered: '2018-10-03',
            enrolledCourse: [
                {
                    id: '1234',
                    name: 'Web Full Stack1',
                    image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                },
                {
                    id: '12345',
                    name: 'Web Full Stack2',
                    image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                },
                {
                    id: '12347',
                    name: 'Web Full Stack3',
                    image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                },
            ],
            attendance: 74,
            premium: true,
        });
    }, 1000);
};

export const registerStudent = (req, res) => {
    console.log(req.body);
    setTimeout(() => {
        res.json(req.body);
    }, 1000)
};

export const saveStudent = (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    setTimeout(() => {
        res.json(req.body);
    }, 1000)
};

