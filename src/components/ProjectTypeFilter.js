import React, { useState, useEffect } from "react";
import { getProjectTypes } from "../services/datasetUtils";
import "./ProjectTypeFilter.css";

const ProjectTypeFilter = ({ onFilter }) => {
  const [projectTypes] = useState(getProjectTypes());
  const [selection, isSelected, toggleSelection] = useSelection(projectTypes);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  useEffect(() => {
    saveSelectionToStorage(selection);
    onFilter(selection);
  }, [selection, onFilter]);
  return (
    <div className="dots-map__project-type-filter">
      <button onClick={toggleOpen}>Project types</button>
      {open && (
        <ul className="dots-map__project-type-filter__dropdown">
          {projectTypes.map((projectType) => (
            <li key={projectType}>
              <ProjectTypeCheckbox
                projectType={projectType}
                isSelected={isSelected(projectType)}
                onToggle={() => toggleSelection(projectType)}
              />
            </li>
          ))}
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

function useSelection(projectTypes) {
  const [selection, setSelection] = useState(
    readSelectionFromStorage() || createInitialSelection(projectTypes)
  );
  const isSelected = (projectType) => selection[projectType];
  const toggle = (projectType) => {
    setSelection({
      ...selection,
      [projectType]: !isSelected(projectType),
    });
  };
  return [selection, isSelected, toggle];
}

function readSelectionFromStorage() {
  const storedSelection = sessionStorage.getItem(
    "dotsMap-projectTypeFilterSelection"
  );
  return storedSelection ? JSON.parse(storedSelection) : null;
}

function saveSelectionToStorage(selection) {
  sessionStorage.setItem(
    "dotsMap-projectTypeFilterSelection",
    JSON.stringify(selection)
  );
}

function createInitialSelection(projectTypes) {
  return projectTypes.reduce(
    (selection, projectType) => ({
      ...selection,
      [projectType]: true,
    }),
    {}
  );
}
