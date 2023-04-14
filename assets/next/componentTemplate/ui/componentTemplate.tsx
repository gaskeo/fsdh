import styles from "./../styles/componentTemplate.module.css";
import ComponentTemplateModel from "../model/componentTemplate";

interface ComponentTemplateProps {

}

export default function ComponentTemplate({...props}: ComponentTemplateProps) {

    const {foo} = ComponentTemplateModel();

    return (
        <div class={styles.componentTemplate}>
        </div>
    );
}