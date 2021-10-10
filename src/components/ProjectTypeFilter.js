import React, { useState } from "react";
import { getProjectTypes } from "../services/datasetUtils";
import { RoundedButton } from "./RoundedButton";
import "./ProjectTypeFilter.css";

const ProjectTypeFilter = ({
  projectTypeSelection,
  toggleProjectTypeSelection,
  onClearAll,
}) => {
  const [projectTypes] = useState(getProjectTypes());
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  return (
    <div className="dots-map__project-type-filter">
      <button onClick={toggleOpen}>Project types</button>
      {open && (
        <ul className="dots-map__project-type-filter__dropdown">
          {projectTypes.map((projectType) => (
            <li key={projectType}>
              <ProjectTypeCheckbox
                projectType={projectType}
                isSelected={projectTypeSelection[projectType]}
                onToggle={() => toggleProjectTypeSelection(projectType)}
              />
            </li>
          ))}
          <li>
            <ClearAll onClick={onClearAll} />
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProjectTypeFilter;

const ProjectTypeCheckbox = ({ projectType, isSelected, onToggle }) => (
  <div className="dots-map__project-type-filter__option">
    <button onClick={onToggle}>
      <FakeCheckbox checked={isSelected} />
      <span>{projectType}</span>
    </button>
  </div>
);

const FakeCheckbox = ({ checked }) => (
  <div>
    <div
      className={`dots-map__project-type-filter__checkbox ${
        checked ? "dots-map__project-type-filter__checkbox--selected" : ""
      }`}
    >
      {checked && (
        <img src={`${process.env.PUBLIC_URL}/tick.png`} alt="checked" />
      )}
    </div>
  </div>
);

const ClearAll = ({ onClick }) => (
  <RoundedButton
    className="dots-map__project-type-filter__clear-all"
    onClick={onClick}
  >
    Clear all
  </RoundedButton>
);
