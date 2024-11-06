import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabCategory = () => {
    return (
        <div>
            <Tabs>
                <div className='container mx-auto px-6 py-10'>
                    <div className='flex items-center justify-center'>
                        <TabList>
                            <Tab>Web Development</Tab>
                            <Tab>Digital Marketing</Tab>
                            <Tab>Graphic Design</Tab>
                            <Tab>Project Manager</Tab>
                        </TabList>
                    </div>

                    <TabPanel>
                        <h2></h2>
                    </TabPanel>
                    <TabPanel>
                        <h2></h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default TabCategory;