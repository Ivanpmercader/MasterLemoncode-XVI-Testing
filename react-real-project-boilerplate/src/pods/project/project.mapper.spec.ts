import * as apiModel from './api/project.api-model';
import { mapProjectFromApiToVm } from "./project.mapper";
import * as viewModel from './project.vm';

const projectMock: apiModel.Project = {
    id: '1',
    name: 'Anne',
    externalId: 'extId1',
    comments: 'Anne comments',
    isActive: false,
    employees: [
        {
            id: 'employee1',
            isAssigned: true,
            employeeName: 'Carles'
        }
    ]
}

describe('Project Mapper specs', () => {
    it.each<{project: apiModel.Project}>([
        { project: undefined },
        { project: null },
        { project: {} as apiModel.Project }
    ])(' should return empty viewModel project object when project is undefined, null or empty', 
        ({project}) => {

        const mapperResult: viewModel.Project = mapProjectFromApiToVm(project);

        const expectResult: viewModel.Project = viewModel.createEmptyProject();

        expect(mapperResult).toEqual(expectResult);
        expect(mapperResult).toStrictEqual(expectResult);
    });
    it.each<{project: apiModel.Project}>([
        { project: {
            id: '',
            name: '',
            externalId: '',
            comments: '',
            isActive: false,
            employees: undefined
        } },
        { project: {
            id: '',
            name: '',
            externalId: '',
            comments: '',
            isActive: false,
            employees: null
        } },
        { project: {
            id: '',
            name: '',
            externalId: '',
            comments: '',
            isActive: false,
            employees: []
        } },
    ])(' should return empty employeeSummary project array when employeeSummary project is undefined, null or empty', 
        ({project}) => {
        const mapperResult: viewModel.Project = mapProjectFromApiToVm(project);

        const { employees: expectResult }: viewModel.Project = viewModel.createEmptyProject();

        expect(mapperResult.employees).toStrictEqual(expectResult);
    });

    it('should indicate if employees are less than or equal of 1', ()=> {
        
        const mapperResult: viewModel.Project = mapProjectFromApiToVm(projectMock);

        expect(mapperResult.employees.length).toBeGreaterThanOrEqual(1);

    });
    

    it('should pass if the view project object is equal', ()=> {
        
        const mapperResult: viewModel.Project = mapProjectFromApiToVm(projectMock);

        const viewProject: viewModel.Project = projectMock as viewModel.Project;
        
        expect(mapperResult).toStrictEqual(viewProject);

    });
        

    it('should pass if the view project object is not equal', ()=> {
        
        const mapperResult: viewModel.Project = mapProjectFromApiToVm(projectMock);

       
        const notEqualViewProject: viewModel.Project = {
            ...(projectMock as viewModel.Project),
            name: 'Paris',
            comments: 'Paris comments',
        }
        
        expect(mapperResult).not.toStrictEqual(notEqualViewProject);

    });
});