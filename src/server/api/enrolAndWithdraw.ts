
export const getEnrolData = (req, res) => {
    console.log(req.query)

    setTimeout(()=>{
        res.json({
            courses: [
                {
                    name: 'Web Full Stack5',
                    id: '123',
                    from: '2018-11-07',
                    to: '2018-11-20',
                    description: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
                    students: [
                        {
                            id: '223',
                            name: 'Super Man',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                        {
                            id: '223',
                            name: 'Super Man',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                        {
                            id: '223',
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
                },
                {
                    name: 'Web Front End5',
                    id: '1243',
                    from: '2018-11-20',
                    to: '2018-11-30',
                    description: 'dsafdsfdsafsda fdsafds fds dsaf dn simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
                    students: [
                        {
                            id: '223',
                            name: 'Super Man4',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                        {
                            id: '223',
                            name: 'Super Man8',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                        {
                            id: '223',
                            name: 'Super Man99',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                    ],
                    lecturer: {
                        name: 'Super Man',
                        image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        rating: 5,
                    },
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                    capacity: 10,
                }
            ],
            students: [
                {
                    id: '223',
                    name: 'Super Man2',
                    email: 'ffdsaf@gmail.com',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                    phone: '3342343242'
                },
                {
                    id: '2234',
                    name: 'Super Man3',
                    email: 'ffds33232af@gmail.com',
                    image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
                    phone: '3342343333432242'
                },
                {
                    id: '22333',
                    name: 'Super Man4',
                    email: 'ffd$$#@saf@gmail.com',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                    phone: '343242'
                },
            ],
        });
    }, 2000);
};

export const enrolStudent = (req, res) => {
    console.log(req.body);
    setTimeout(() => {
        res.json(req.body);
    }, 1000)
};

export const getWithdrawData = (req, res) => {
    console.log(req.query)

    setTimeout(()=>{
        res.json({
            courses: [
                {
                    name: 'Web Full Stack5',
                    id: '123',
                    from: '2018-11-07',
                    to: '2018-11-20',
                    description: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
                    students: [
                        {
                            id: '223',
                            name: 'Super Man',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                        {
                            id: '223',
                            name: 'Super Man',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                        {
                            id: '223',
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
                },
                {
                    name: 'Web Front End5',
                    id: '1243',
                    from: '2018-11-20',
                    to: '2018-11-30',
                    description: 'dsafdsfdsafsda fdsafds fds dsaf dn simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
                    students: [
                        {
                            id: '223',
                            name: 'Super Man4',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                        {
                            id: '223',
                            name: 'Super Man8',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                        {
                            id: '223',
                            name: 'Super Man99',
                            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        },
                    ],
                    lecturer: {
                        name: 'Super Man',
                        image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        rating: 5,
                    },
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                    capacity: 10,
                }
            ],
            students: [
                {
                    id: '223',
                    name: 'Super Man2',
                    email: 'ffdsaf@gmail.com',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                    phone: '3342343242'
                },
                {
                    id: '2234',
                    name: 'Super Man3',
                    email: 'ffds33232af@gmail.com',
                    image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
                    phone: '3342343333432242'
                },
                {
                    id: '22333',
                    name: 'Super Man4',
                    email: 'ffd$$#@saf@gmail.com',
                    image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                    phone: '343242'
                },
            ],
        });
    }, 2000);
};

export const withdrawStudent = (req, res) => {
    console.log({withdraw: req.body});
    setTimeout(() => {
        res.json(req.body);
    }, 1000)
};
