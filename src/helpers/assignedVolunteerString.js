function makeAssignedVolunteerString(volunteers, user) {
    const volunteerArray = [];
    volunteers.map((volunteer) => {
        if (volunteer.id !== user.id) {
            volunteerArray.push(`${volunteer.firstName} ${volunteer.lastName}`);
        }
    });
    if (volunteerArray.length === 0) {
        return <span>Er zijn geen andere vrijwilligers aangewezen</span>;
    } else {
        return volunteerArray.join(', ');
    }
}

export default makeAssignedVolunteerString;