export function studentHobbies(data, isFindAll) {
    if(isFindAll){
        const studentsData = data.map(item => {
            const studentHobbies = item.student_hobbies.map(hobby => {
                return {
                    id: hobby.hobbies_student.id,
                    title: hobby.hobbies_student.title
                }
            })
            return {
                id: item.id,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                hobbies: studentHobbies
            }
        });
        return studentsData;
    }
    const studentsData = data.student_hobbies.map(item => {
        return {
            id: item.hobbies_student.id,
            title: item.hobbies_student.title
        }
    })
    return studentsData;
}