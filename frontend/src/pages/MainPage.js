import { Box, DataTable, Header, Page, PageContent, PageHeader, Text } from "grommet";
import React from "react";

const MainPage = () => {
    const AppBar = (props) => (
        <Header
            // background="brand"
            pad={{ left: "medium", right: "small", vertical: "small" }}
            elevation="medium"
            {...props}
        />
    );

    const Inventory = () => {
        return (
            <Box key="dataTable" alignSelf="start">
                <DataTable columns={[
                    { property: 'name', header: 'Name' },
                    { property: 'quantity', header: 'Quantity' },
                ]} data={[
                    { name: 'Alan', color: 'blue' },
                    { name: 'Chris', color: 'purple' },
                    { name: 'Eric', color: 'orange' },
                ]} sortable
                />
            </Box>
        );
    };

    return (
        <Page>
            <AppBar>
                <Text size="large">Inventory management system</Text>
            </AppBar>
            <PageContent>
                <PageHeader title="Inventory"/>
                <Inventory/>
            </PageContent>
        </Page>
    );
};

export default MainPage;
