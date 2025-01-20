
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
SN: faker.lorem.sentence("8"),
No: faker.lorem.sentence(""),
PktMgktFED: faker.lorem.sentence(""),
Pkt: faker.lorem.sentence(""),
Nama: faker.lorem.sentence(""),
Jawatan: faker.lorem.sentence(""),
TarikhMasukTentera: faker.lorem.sentence(""),
KursusKerjaya: faker.lorem.sentence(""),
KursusKepakaran: faker.lorem.sentence(""),
KelayakanAkademik: faker.lorem.sentence(""),
DKT: faker.lorem.sentence(""),
SKT: faker.lorem.sentence(""),
TarikhTamatPerkhidmatan: faker.lorem.sentence(""),
KursusTerkiniDalamNegara: faker.lorem.sentence(""),
TarikhKursusTerkini: faker.lorem.sentence(""),
KursusLuarNegara: faker.lorem.sentence(""),
TarikhKursusLuarNegara: faker.lorem.sentence(""),
Catatan: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
