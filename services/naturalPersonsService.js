const Models = require('../models');

let client = null;
let models = null;

let getAllPersons = async () => {
    let naturalPersonModel = models.naturalPerson;
    return naturalPersonModel.findAll({});
}

let getAllPersonsDataTable = async (dataTableParams) => {
    let naturalPersonModel = models.naturalPerson;
    let queryObject = {
        where: {},
        offset: Number.parseInt(dataTableParams.start),
        limit: Number.parseInt(dataTableParams.length)
    };

    let whereObject = {};
    let filtered = false;
    dataTableParams.columns.forEach((column) => {
        let propertyName = column.data;
        let value = column.search.value;
        if (value) {
            filtered = true;
            whereObject[propertyName] = { '$like': value + '%' };
        }
    })
    queryObject.where = whereObject;
    console.log(queryObject);
    return naturalPersonModel.findAll(queryObject)
        .then(async (persons) => {
            let response = {};
            response.draw = Number.parseInt(dataTableParams.draw);
            if (filtered)
                response.recordsFiltered = persons.length;
            response.recordsTotal = await getTotalCount();
            console.log(response);
            response.data = persons;
            return response;
        })
}

let getTotalCount = async () => {
    return models.naturalPerson.findAll({
        attributes: [[client.fn('count', client.col('*')), 'totalCount']]
    }).then(result => {
        return result[0].dataValues.totalCount;
    })
}

let generatMockNaturalPerson = async () => {
    let divisionModel = models.division;
    let districtModel = models.district;
    let naturalPersonModel = models.naturalPerson;
    let mockPlaces = require('../data/mockPlaces.json');
    let mockNames = require('../data/mockNames.json');
    let mockDistrictName = mockPlaces[Math.floor(Math.random() * 999)].district;
    let mockDivisionName = mockPlaces[Math.floor(Math.random() * 999)].division;



    //Read from mock disticts
    let district = await districtModel.findOne({
        where: { name: mockDistrictName }
    }).then((district) => {
        if (district) {
            return district;
        }
        return districtModel.create({ name: mockDistrictName })
    });


    //Read from mock divisions
    let division = await divisionModel.findOne({
        where: { name: mockDivisionName }
    })
        .then((division) => {
            if (division) {
                return division;
            }
            return divisionModel.create({ name: mockDivisionName })
        });


    //Read from mock names
    let mockFirstName = mockNames[Math.floor(Math.random() * 999)].firstName;
    let mockSecondName = mockNames[Math.floor(Math.random() * 999)].secondName;
    let mockSurname = mockNames[Math.floor(Math.random() * 999)].surname;

    let person = await naturalPersonModel.build({ firstName: mockFirstName, secondName: mockSecondName, surname: mockSurname });
    person.setDistrict(district, { save: false });
    person.setDivision(division, { save: false });
    return person.save();
}

let findNaturalContactByIdentifier = async (params) => {
    let naturalPersonsModel = models.naturalPerson;
    return naturalPersonsModel.findOne({
        where: {
            nationalId: params.nationalId
        }
    });
}

let findNaturalContactByNonIdParams = async (params) => {
    let naturalPersonsModel = models.naturalPerson;
    return naturalPersonsModel.findAll({
        where: {
            surname: {
                [client.Op.like]: '%' + params.surname
            },
            firstName: {
                [client.Op.like]: '%' + params.firstName
            },
            secondName: {
                [client.Op.like]: '%' + params.secondName
            }
        }
    });
}


module.exports = (_client) => {
    models = Models(_client);
    client = _client;

    return {
        getAllPersons: getAllPersons,
        getAllPersonsDataTable: getAllPersonsDataTable,
        generatMockNaturalPerson: generatMockNaturalPerson,
        findNaturalContactByIdentifier: findNaturalContactByIdentifier,
        findNaturalContactByNonIdParams: findNaturalContactByNonIdParams
    }
}