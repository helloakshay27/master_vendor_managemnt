import React, { useState, useEffect } from "react";
import { BarChart3, ChevronDown, TrendingUp } from "lucide-react";



export const VendorSectionSelector = ({
  data,
  onSelectionChange,
  dashboardType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState([]);

  // Initialize with all sections selected
  useEffect(() => {
    const allSections = Object.values(data).flatMap((category) =>
      category.options.map((option) => option.id),
    );
    setSelectedSections(allSections);
  }, []);

  const isSectionSelected = (sectionId) => {
    return selectedSections.includes(sectionId);
  };

  const toggleSection = (sectionId) => {
    const newSelection = isSectionSelected(sectionId)
      ? selectedSections.filter((id) => id !== sectionId)
      : [...selectedSections, sectionId];

    setSelectedSections(newSelection);
    onSelectionChange(newSelection);
  };

  const selectAllForCategory = (categoryKey, selected) => {
    const category = data[categoryKey];
    const categoryIds = category.options.map((option) => option.id);

    let newSelection;
    if (selected) {
      newSelection = [...new Set([...selectedSections, ...categoryIds])];
    } else {
      newSelection = selectedSections.filter((id) => !categoryIds.includes(id));
    }

    setSelectedSections(newSelection);
    onSelectionChange(newSelection);
  };

  const getCategorySelectionState = (categoryKey) => {
    const category = data[categoryKey];
    const categoryIds = category.options.map((option) => option.id);
    const selectedCount = categoryIds.filter((id) =>
      selectedSections.includes(id),
    ).length;

    if (selectedCount === 0) return "none";
    if (selectedCount === categoryIds.length) return "all";
    return "partial";
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setSelectedSections([]);
    onSelectionChange([]);
  };

  const totalSections = Object.values(data).reduce(
    (acc, cat) => acc + cat.options.length,
    0,
  );

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          backgroundColor: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        <BarChart3 style={{ width: "16px", height: "16px" }} />
        <span>
          Customize Dashboard ({selectedSections.length}/{totalSections})
        </span>
        <ChevronDown style={{ width: "16px", height: "16px" }} />
      </button>

      {isOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998,
            }}
            onClick={() => setIsOpen(false)}
          />

          <div
            style={{
              position: "absolute",
              right: 0,
              marginTop: "8px",
              width: "384px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              border: "1px solid #e5e7eb",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <h4
                style={{
                  fontWeight: 500,
                  color: "#111827",
                  margin: "0 0 4px 0",
                  fontSize: "14px",
                }}
              >
                Select Analytics
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                Choose analytics from different modules
              </p>
            </div>

            <div
              style={{
                maxHeight: "384px",
                overflowY: "auto",
              }}
            >
              {Object.entries(data).map(([categoryKey, category], index) => {
                const Icon = category.icon;
                const selectionState = getCategorySelectionState(categoryKey);

                return (
                  <div key={categoryKey}>
                    <div style={{ padding: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Icon
                            style={{
                              width: "16px",
                              height: "16px",
                              color: category.color,
                            }}
                          />
                          <span
                            style={{
                              fontWeight: 500,
                              color: "#111827",
                              fontSize: "14px",
                            }}
                          >
                            {category.label}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectionState === "all"}
                          ref={(input) => {
                            if (input) {
                              input.indeterminate =
                                selectionState === "partial";
                            }
                          }}
                          onChange={(e) =>
                            selectAllForCategory(categoryKey, e.target.checked)
                          }
                          style={{
                            width: "16px",
                            height: "16px",
                            cursor: "pointer",
                            accentColor: "#d97938",
                          }}
                        />
                      </div>

                      <div style={{ marginLeft: "24px" }}>
                        {category.options.map((option) => (
                          <div
                            key={option.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginBottom: "8px",
                            }}
                          >
                            <input
                              type="checkbox"
                              id={`${categoryKey}-${option.id}`}
                              checked={isSectionSelected(option.id)}
                              onChange={() => toggleSection(option.id)}
                              style={{
                                width: "16px",
                                height: "16px",
                                cursor: "pointer",
                                accentColor: "#d97938",
                              }}
                            />
                            <label
                              htmlFor={`${categoryKey}-${option.id}`}
                              style={{
                                fontSize: "13px",
                                color: "#374151",
                                cursor: "pointer",
                                flex: 1,
                              }}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {index < Object.entries(data).length - 1 && (
                      <div
                        style={{
                          height: "1px",
                          backgroundColor: "#e5e7eb",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                padding: "16px",
                borderTop: "1px solid #e5e7eb",
                backgroundColor: "#f9fafb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                >
                  {selectedSections.length} analytics selected
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={handleClearAll}
                    style={{
                      padding: "6px 12px",
                      fontSize: "13px",
                      color: "#6b7280",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleApply}
                    style={{
                      padding: "6px 16px",
                      fontSize: "13px",
                      backgroundColor: "#d97938",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
