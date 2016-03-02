export default function (nga, admin) {
    var organism = admin.getEntity('organism');
    var fields = [
        nga.field('abbreviation').isDetailLink(true),
        nga.field('genus'),
        nga.field('species'),
        nga.field('common_name'),
        nga.field('comment'),
    ];

    organism.listView()
        .fields(fields)
        .listActions(['edit', 'show']);

    organism.editionView()
        .fields(fields);

    organism.creationView()
        .fields(fields);

    return organism;
}
