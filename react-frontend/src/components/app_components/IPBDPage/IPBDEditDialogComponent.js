import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const IPBDCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            SN: _entity?.SN,
No: _entity?.No,
PktMgktFED: _entity?.PktMgktFED,
Pkt: _entity?.Pkt,
Nama: _entity?.Nama,
Jawatan: _entity?.Jawatan,
TarikhMasukTentera: _entity?.TarikhMasukTentera,
KursusKerjaya: _entity?.KursusKerjaya,
KursusKepakaran: _entity?.KursusKepakaran,
KelayakanAkademik: _entity?.KelayakanAkademik,
DKT: _entity?.DKT,
SKT: _entity?.SKT,
TarikhTamatPerkhidmatan: _entity?.TarikhTamatPerkhidmatan,
KursusTerkiniDalamNegara: _entity?.KursusTerkiniDalamNegara,
TarikhKursusTerkini: _entity?.TarikhKursusTerkini,
KursusLuarNegara: _entity?.KursusLuarNegara,
TarikhKursusLuarNegara: _entity?.TarikhKursusLuarNegara,
Catatan: _entity?.Catatan,
        };

        setLoading(true);
        try {
            
        const result = await client.service("iPBD").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info iPBD updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit IPBD" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="iPBD-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="SN">SN:</label>
                <InputText id="SN" className="w-full mb-3 p-inputtext-sm" value={_entity?.SN} onChange={(e) => setValByKey("SN", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["SN"]) && (
              <p className="m-0" key="error-SN">
                {error["SN"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="No">No:</label>
                <InputNumber id="No" className="w-full mb-3 p-inputtext-sm" value={_entity?.No} onChange={(e) => setValByKey("No", e.value)}  required  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["No"]) && (
              <p className="m-0" key="error-No">
                {error["No"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="PktMgktFED">Pkt Mengikut FED (M):</label>
                <InputText id="PktMgktFED" className="w-full mb-3 p-inputtext-sm" value={_entity?.PktMgktFED} onChange={(e) => setValByKey("PktMgktFED", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["PktMgktFED"]) && (
              <p className="m-0" key="error-PktMgktFED">
                {error["PktMgktFED"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Pkt">Pkt:</label>
                <InputText id="Pkt" className="w-full mb-3 p-inputtext-sm" value={_entity?.Pkt} onChange={(e) => setValByKey("Pkt", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Pkt"]) && (
              <p className="m-0" key="error-Pkt">
                {error["Pkt"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Nama">Nama:</label>
                <InputText id="Nama" className="w-full mb-3 p-inputtext-sm" value={_entity?.Nama} onChange={(e) => setValByKey("Nama", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Nama"]) && (
              <p className="m-0" key="error-Nama">
                {error["Nama"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Jawatan">Jawatan:</label>
                <InputText id="Jawatan" className="w-full mb-3 p-inputtext-sm" value={_entity?.Jawatan} onChange={(e) => setValByKey("Jawatan", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Jawatan"]) && (
              <p className="m-0" key="error-Jawatan">
                {error["Jawatan"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="TarikhMasukTentera">Tarikh Masuk Tentera:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TarikhMasukTentera"]) && (
              <p className="m-0" key="error-TarikhMasukTentera">
                {error["TarikhMasukTentera"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KursusKerjaya">Kursus Kerjaya:</label>
                <InputText id="KursusKerjaya" className="w-full mb-3 p-inputtext-sm" value={_entity?.KursusKerjaya} onChange={(e) => setValByKey("KursusKerjaya", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KursusKerjaya"]) && (
              <p className="m-0" key="error-KursusKerjaya">
                {error["KursusKerjaya"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KursusKepakaran">Kursus Kepakaran:</label>
                <InputText id="KursusKepakaran" className="w-full mb-3 p-inputtext-sm" value={_entity?.KursusKepakaran} onChange={(e) => setValByKey("KursusKepakaran", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KursusKepakaran"]) && (
              <p className="m-0" key="error-KursusKepakaran">
                {error["KursusKepakaran"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KelayakanAkademik">Kelayakan Akademik:</label>
                <InputText id="KelayakanAkademik" className="w-full mb-3 p-inputtext-sm" value={_entity?.KelayakanAkademik} onChange={(e) => setValByKey("KelayakanAkademik", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KelayakanAkademik"]) && (
              <p className="m-0" key="error-KelayakanAkademik">
                {error["KelayakanAkademik"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="DKT">DKT:</label>
                <InputText id="DKT" className="w-full mb-3 p-inputtext-sm" value={_entity?.DKT} onChange={(e) => setValByKey("DKT", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["DKT"]) && (
              <p className="m-0" key="error-DKT">
                {error["DKT"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="SKT">SKT:</label>
                <InputText id="SKT" className="w-full mb-3 p-inputtext-sm" value={_entity?.SKT} onChange={(e) => setValByKey("SKT", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["SKT"]) && (
              <p className="m-0" key="error-SKT">
                {error["SKT"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="TarikhTamatPerkhidmatan">Tarikh Tamat Perkhidmatan:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TarikhTamatPerkhidmatan"]) && (
              <p className="m-0" key="error-TarikhTamatPerkhidmatan">
                {error["TarikhTamatPerkhidmatan"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KursusTerkiniDalamNegara">Kursus Terkini Dalam Negara:</label>
                <InputText id="KursusTerkiniDalamNegara" className="w-full mb-3 p-inputtext-sm" value={_entity?.KursusTerkiniDalamNegara} onChange={(e) => setValByKey("KursusTerkiniDalamNegara", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KursusTerkiniDalamNegara"]) && (
              <p className="m-0" key="error-KursusTerkiniDalamNegara">
                {error["KursusTerkiniDalamNegara"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="TarikhKursusTerkini">Tarikh Kursus Terkini:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TarikhKursusTerkini"]) && (
              <p className="m-0" key="error-TarikhKursusTerkini">
                {error["TarikhKursusTerkini"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KursusLuarNegara">Kursus Luar Negara:</label>
                <InputText id="KursusLuarNegara" className="w-full mb-3 p-inputtext-sm" value={_entity?.KursusLuarNegara} onChange={(e) => setValByKey("KursusLuarNegara", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KursusLuarNegara"]) && (
              <p className="m-0" key="error-KursusLuarNegara">
                {error["KursusLuarNegara"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="TarikhKursusLuarNegara">Tarikh Kursus Luar Negara:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TarikhKursusLuarNegara"]) && (
              <p className="m-0" key="error-TarikhKursusLuarNegara">
                {error["TarikhKursusLuarNegara"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Catatan">Catatan:</label>
                <InputText id="Catatan" className="w-full mb-3 p-inputtext-sm" value={_entity?.Catatan} onChange={(e) => setValByKey("Catatan", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Catatan"]) && (
              <p className="m-0" key="error-Catatan">
                {error["Catatan"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(IPBDCreateDialogComponent);
