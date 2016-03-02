export default function (nga, admin) {
    var feature = admin.getEntity('feature'),
        cvterm = admin.getEntity('cvterm'),
        dbxref = admin.getEntity('dbxref'),
        organism = admin.getEntity('organism');

    var fields = [
        nga.field('name').isDetailLink(true),
        nga.field('uniquename'),
        nga.field('type_id', 'reference')
            .targetEntity(cvterm)
            .targetField(nga.field('name'))
            .label('Cvterm'),
        nga.field('dbxref_id', 'reference')
            .targetEntity(dbxref)
            .targetField(nga.field('description'))
            .label('Dbxref'),
        nga.field('organism_id', 'reference')
            .targetEntity(organism)
            .targetField(nga.field('common_name'))
            .label('Organism'),
        nga.field('is_analysis', 'boolean'),
        nga.field('is_osbolete', 'boolean'),
    ];

    feature.listView()
        .fields(fields)
        .listActions(['edit', 'show']);

    feature.editionView()
        .fields(fields);

    return feature;
}
