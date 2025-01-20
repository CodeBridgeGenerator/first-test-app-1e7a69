import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";


const SingleIPBDPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    

    useEffect(() => {
        //on mount
        client
            .service("iPBD")
            .get(urlParams.singleIPBDId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "IPBD", type: "error", message: error.message || "Failed get iPBD" });
            });
    }, [props,urlParams.singleIPBDId]);


    const goBack = () => {
        navigate("/iPBD");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">IPBD</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>iPBD/{urlParams.singleIPBDId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">SN</label><p className="m-0 ml-3" >{_entity?.SN}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">No</label><p className="m-0 ml-3" >{Number(_entity?.No)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Pkt Mengikut FED (M)</label><p className="m-0 ml-3" >{_entity?.PktMgktFED}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Pkt</label><p className="m-0 ml-3" >{_entity?.Pkt}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Nama</label><p className="m-0 ml-3" >{_entity?.Nama}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Jawatan</label><p className="m-0 ml-3" >{_entity?.Jawatan}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Kursus Kerjaya</label><p className="m-0 ml-3" >{_entity?.KursusKerjaya}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Kursus Kepakaran</label><p className="m-0 ml-3" >{_entity?.KursusKepakaran}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Kelayakan Akademik</label><p className="m-0 ml-3" >{_entity?.KelayakanAkademik}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">DKT</label><p className="m-0 ml-3" >{_entity?.DKT}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">SKT</label><p className="m-0 ml-3" >{_entity?.SKT}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Kursus Terkini Dalam Negara</label><p className="m-0 ml-3" >{_entity?.KursusTerkiniDalamNegara}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Kursus Luar Negara</label><p className="m-0 ml-3" >{_entity?.KursusLuarNegara}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Catatan</label><p className="m-0 ml-3" >{_entity?.Catatan}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <TabView>
                
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleIPBDId}
        user={props.user}
        alert={props.alert}
        serviceName="iPBD"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleIPBDPage);
