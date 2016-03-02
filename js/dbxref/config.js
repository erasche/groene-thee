export default function (nga, admin) {
    var dbxref = admin.getEntity('dbxref'),
        db = admin.getEntity('db');

    var fields = [
        nga.field('db_id', 'reference')
            .targetEntity(db)
            .targetField(nga.field('name'))
            .label('DB'),
        nga.field('accession').isDetailLink(true),
        nga.field('version'),
        nga.field('description', 'text'),
    ];

    dbxref.listView()
        .fields(fields)
        .listActions(['show']);

    dbxref.editionView()
        .fields(fields);

    return dbxref;
}
