import UpdateEntityField from "./UpdateEntityField.js";

export default function ({
                             subject,
                             id,
                             fields,
                             replaceSuffix = "s",
                             replaceBy = "",
                             role = "sub_admin",
                             service = "emergency",
                             onSuccess = null,
                             searchByProp = "id"
                         }) {


    return (
        <div>
            {
                fields.map((field, index) => <UpdateEntityField
                        key={index}
                        field={field}
                        role={role}
                        replaceBy={replaceBy}
                        replaceSuffix={replaceSuffix}
                        id={id}
                        service={service}
                        subject={subject}
                        onSuccess={onSuccess}
                        searchByProp={searchByProp}
                    />
                )
            }
        </div>
    );
}
