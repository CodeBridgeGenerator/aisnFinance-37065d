import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import DirectorDecisionPage from "./DirectorDecisionPage";

const DirectorDecisionProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <DirectorDecisionPage />
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

export default connect(mapState, mapDispatch)(DirectorDecisionProjectLayoutPage);