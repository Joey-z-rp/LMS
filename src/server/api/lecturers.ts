import Lecturer from '../models/Lecturer';

export const getLecturers = async (req, res) => {
    // const lecturer = new Lecturer({
    //     name: 'Jeffrey Chadwick',
    //     email: 'jeffreychadwick@gmail.com',
    //     phone: '0476123123',
    //     image: 'https://pickaface.net/gallery/avatar/sheela.kalawar52185c54f360f.png',
    //     coursesTeaching: [],
    //     rating: 5,
    // });
    //
    // await lecturer.save();
    const lecturers = (await Lecturer.find({})).map(lecturer => processLecturer(lecturer));

    res.json(lecturers);
};

export function processLecturer(rawLecturer) {
    return {
        id: rawLecturer._id.toString(),
        name: rawLecturer.name,
        email: rawLecturer.email,
        phone: rawLecturer.phone,
        image: rawLecturer.image,
        coursesTeaching: rawLecturer.coursesTeaching,
        rating: rawLecturer.rating,
    }
}
