export default function (nga, admin) {
    var db = admin.getEntity('db');

    var fields = [
        nga.field('db_id'),
        nga.field('name'),
        nga.field('description'),
        nga.field('url_prefix'),
        nga.field('url'),
    ];

    db.listView()
        .fields(fields)
        .listActions(['show']);

    db.editionView()
        .fields(fields);

    return db;
}
