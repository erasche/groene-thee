export default function (nga, admin) {
    var organism = admin.getEntity('organism');
    var org_fields = [
        nga.field('abbreviation').isDetailLink(true),
        nga.field('genus'),
        nga.field('species'),
        nga.field('common_name'),
        nga.field('comment'),
    ];

    organism.listView()
        .fields(org_fields)
        .listActions(['edit', 'show']);

    organism.editionView()
        .fields(org_fields);

    organism.creationView()
        .fields(org_fields);

    return organism;
}
