export default function (nga, admin) {
    var cvterm = admin.getEntity('cvterm'),
        dbxref = admin.getEntity('dbxref');

    var fields = [
        nga.field('name').isDetailLink(true),
        nga.field('definition', 'text'),
        nga.field('dbxref_id', 'reference')
            .targetEntity(dbxref)
            .targetField(nga.field('description'))
            .label('Dbxref'),
        nga.field('is_relationshiptype', 'boolean'),
        nga.field('is_osbolete', 'boolean'),
    ];

    cvterm.listView()
        .fields(fields)
        .listActions(['show']);

    cvterm.editionView()
        .fields(fields);

    return cvterm;
}
