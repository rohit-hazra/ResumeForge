import { useResumeBuilder } from '../../hooks/useResumeBuilder.js';
export default function MobileBuilderTabs() {
const { tab, setTab } = useResumeBuilder();
return <div className="mobile-tabs">
          <button
            className={tab === "edit" ? "active" : ""}
            onClick={() => setTab("edit")}
          >
            Edit
          </button>
          <button
            className={tab === "preview" ? "active" : ""}
            onClick={() => setTab("preview")}
          >
            Preview
          </button>
        </div>;
}
