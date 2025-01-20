import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const IPBDCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.SN)) {
                error["SN"] = `SN field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.No)) {
                error["No"] = `No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.PktMgktFED)) {
                error["PktMgktFED"] = `Pkt Mengikut FED (M) field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.Pkt)) {
                error["Pkt"] = `Pkt field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.Nama)) {
                error["Nama"] = `Nama field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.Jawatan)) {
                error["Jawatan"] = `Jawatan field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.KursusKerjaya)) {
                error["KursusKerjaya"] = `Kursus Kerjaya field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.KursusKepakaran)) {
                error["KursusKepakaran"] = `Kursus Kepakaran field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.KelayakanAkademik)) {
                error["KelayakanAkademik"] = `Kelayakan Akademik field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.DKT)) {
                error["DKT"] = `DKT field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.SKT)) {
                error["SKT"] = `SKT field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.KursusTerkiniDalamNegara)) {
                error["KursusTerkiniDalamNegara"] = `Kursus Terkini Dalam Negara field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.KursusLuarNegara)) {
                error["KursusLuarNegara"] = `Kursus Luar Negara field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.Catatan)) {
                error["Catatan"] = `Catatan field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            SN: _entity?.SN,No: _entity?.No,PktMgktFED: _entity?.PktMgktFED,Pkt: _entity?.Pkt,Nama: _entity?.Nama,Jawatan: _entity?.Jawatan,TarikhMasukTentera: _entity?.TarikhMasukTentera,KursusKerjaya: _entity?.KursusKerjaya,KursusKepakaran: _entity?.KursusKepakaran,KelayakanAkademik: _entity?.KelayakanAkademik,DKT: _entity?.DKT,SKT: _entity?.SKT,TarikhTamatPerkhidmatan: _entity?.TarikhTamatPerkhidmatan,KursusTerkiniDalamNegara: _entity?.KursusTerkiniDalamNegara,TarikhKursusTerkini: _entity?.TarikhKursusTerkini,KursusLuarNegara: _entity?.KursusLuarNegara,TarikhKursusLuarNegara: _entity?.TarikhKursusLuarNegara,Catatan: _entity?.Catatan,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("iPBD").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info IPBD created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in IPBD" });
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
        <Dialog header="Create IPBD" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="iPBD-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="SN">SN:</label>
                <InputText id="SN" className="w-full mb-3 p-inputtext-sm" value={_entity?.SN} onChange={(e) => setValByKey("SN", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["SN"]) ? (
              <p className="m-0" key="error-SN">
                {error["SN"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="No">No:</label>
                <InputNumber id="No" className="w-full mb-3 p-inputtext-sm" value={_entity?.No} onChange={(e) => setValByKey("No", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["No"]) ? (
              <p className="m-0" key="error-No">
                {error["No"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="PktMgktFED">Pkt Mengikut FED (M):</label>
                <InputText id="PktMgktFED" className="w-full mb-3 p-inputtext-sm" value={_entity?.PktMgktFED} onChange={(e) => setValByKey("PktMgktFED", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["PktMgktFED"]) ? (
              <p className="m-0" key="error-PktMgktFED">
                {error["PktMgktFED"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Pkt">Pkt:</label>
                <InputText id="Pkt" className="w-full mb-3 p-inputtext-sm" value={_entity?.Pkt} onChange={(e) => setValByKey("Pkt", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Pkt"]) ? (
              <p className="m-0" key="error-Pkt">
                {error["Pkt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Nama">Nama:</label>
                <InputText id="Nama" className="w-full mb-3 p-inputtext-sm" value={_entity?.Nama} onChange={(e) => setValByKey("Nama", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Nama"]) ? (
              <p className="m-0" key="error-Nama">
                {error["Nama"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Jawatan">Jawatan:</label>
                <InputText id="Jawatan" className="w-full mb-3 p-inputtext-sm" value={_entity?.Jawatan} onChange={(e) => setValByKey("Jawatan", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Jawatan"]) ? (
              <p className="m-0" key="error-Jawatan">
                {error["Jawatan"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="TarikhMasukTentera">Tarikh Masuk Tentera:</label>
                <Calendar id="TarikhMasukTentera"  value={_entity?.TarikhMasukTentera ? new Date(_entity?.TarikhMasukTentera) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("TarikhMasukTentera", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TarikhMasukTentera"]) ? (
              <p className="m-0" key="error-TarikhMasukTentera">
                {error["TarikhMasukTentera"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KursusKerjaya">Kursus Kerjaya:</label>
                <InputText id="KursusKerjaya" className="w-full mb-3 p-inputtext-sm" value={_entity?.KursusKerjaya} onChange={(e) => setValByKey("KursusKerjaya", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KursusKerjaya"]) ? (
              <p className="m-0" key="error-KursusKerjaya">
                {error["KursusKerjaya"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KursusKepakaran">Kursus Kepakaran:</label>
                <InputText id="KursusKepakaran" className="w-full mb-3 p-inputtext-sm" value={_entity?.KursusKepakaran} onChange={(e) => setValByKey("KursusKepakaran", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KursusKepakaran"]) ? (
              <p className="m-0" key="error-KursusKepakaran">
                {error["KursusKepakaran"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KelayakanAkademik">Kelayakan Akademik:</label>
                <InputText id="KelayakanAkademik" className="w-full mb-3 p-inputtext-sm" value={_entity?.KelayakanAkademik} onChange={(e) => setValByKey("KelayakanAkademik", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KelayakanAkademik"]) ? (
              <p className="m-0" key="error-KelayakanAkademik">
                {error["KelayakanAkademik"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="DKT">DKT:</label>
                <InputText id="DKT" className="w-full mb-3 p-inputtext-sm" value={_entity?.DKT} onChange={(e) => setValByKey("DKT", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["DKT"]) ? (
              <p className="m-0" key="error-DKT">
                {error["DKT"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="SKT">SKT:</label>
                <InputText id="SKT" className="w-full mb-3 p-inputtext-sm" value={_entity?.SKT} onChange={(e) => setValByKey("SKT", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["SKT"]) ? (
              <p className="m-0" key="error-SKT">
                {error["SKT"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="TarikhTamatPerkhidmatan">Tarikh Tamat Perkhidmatan:</label>
                <Calendar id="TarikhTamatPerkhidmatan"  value={_entity?.TarikhTamatPerkhidmatan ? new Date(_entity?.TarikhTamatPerkhidmatan) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("TarikhTamatPerkhidmatan", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TarikhTamatPerkhidmatan"]) ? (
              <p className="m-0" key="error-TarikhTamatPerkhidmatan">
                {error["TarikhTamatPerkhidmatan"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KursusTerkiniDalamNegara">Kursus Terkini Dalam Negara:</label>
                <InputText id="KursusTerkiniDalamNegara" className="w-full mb-3 p-inputtext-sm" value={_entity?.KursusTerkiniDalamNegara} onChange={(e) => setValByKey("KursusTerkiniDalamNegara", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KursusTerkiniDalamNegara"]) ? (
              <p className="m-0" key="error-KursusTerkiniDalamNegara">
                {error["KursusTerkiniDalamNegara"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="TarikhKursusTerkini">Tarikh Kursus Terkini:</label>
                <Calendar id="TarikhKursusTerkini"  value={_entity?.TarikhKursusTerkini ? new Date(_entity?.TarikhKursusTerkini) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("TarikhKursusTerkini", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TarikhKursusTerkini"]) ? (
              <p className="m-0" key="error-TarikhKursusTerkini">
                {error["TarikhKursusTerkini"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="KursusLuarNegara">Kursus Luar Negara:</label>
                <InputText id="KursusLuarNegara" className="w-full mb-3 p-inputtext-sm" value={_entity?.KursusLuarNegara} onChange={(e) => setValByKey("KursusLuarNegara", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["KursusLuarNegara"]) ? (
              <p className="m-0" key="error-KursusLuarNegara">
                {error["KursusLuarNegara"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="TarikhKursusLuarNegara">Tarikh Kursus Luar Negara:</label>
                <Calendar id="TarikhKursusLuarNegara"  value={_entity?.TarikhKursusLuarNegara ? new Date(_entity?.TarikhKursusLuarNegara) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("TarikhKursusLuarNegara", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TarikhKursusLuarNegara"]) ? (
              <p className="m-0" key="error-TarikhKursusLuarNegara">
                {error["TarikhKursusLuarNegara"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Catatan">Catatan:</label>
                <InputText id="Catatan" className="w-full mb-3 p-inputtext-sm" value={_entity?.Catatan} onChange={(e) => setValByKey("Catatan", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Catatan"]) ? (
              <p className="m-0" key="error-Catatan">
                {error["Catatan"]}
              </p>
            ) : null}
          </small>
            </div>
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
