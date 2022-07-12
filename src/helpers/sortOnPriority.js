function sortOnPriority(tasks) {
    tasks.sort( ( a, b ) => {
        const colorOrder = ['hoog', 'middel', 'laag'];

        const aColorIndex = colorOrder.indexOf( a.priority.value );
        const bColorIndex = colorOrder.indexOf( b.priority.value );

        //Sort on creation date if priorit is the same
        if ( aColorIndex === bColorIndex )
            return new Date(a.createdOn) - new Date(b.createdOn);

        return aColorIndex - bColorIndex;
    } );
}

export default sortOnPriority;